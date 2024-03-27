import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManualOrder } from 'src/entities/ManualOrder';
import { Order } from 'src/entities/Order';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(ManualOrder)
    private readonly manualOrderRepository: Repository<ManualOrder>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserInformation(
    startDate: Date,
    endDate: Date,
  ): Promise<{ time: any; number_of_user_accounts: number }[]> {
    const timeDifferenceInDays = Math.ceil(
      Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
    );

    let dateFormat;
    let groupBy;
    if (timeDifferenceInDays <= 1) {
      // Within a day: group by hour
      dateFormat = '%Y-%m-%d %H:00';
      groupBy = 'DATE_FORMAT(user.created_at, "%Y-%m-%d %H:00:00")';
    } else if (timeDifferenceInDays <= 30) {
      // Within a month: group by day
      dateFormat = '%Y-%m-%d';
      groupBy = 'DATE(user.created_at)';
    } else {
      // Greater than a month: group by month
      dateFormat = '%Y-%m';
      groupBy = 'DATE_FORMAT(user.created_at, "%Y-%m-01")';
    }

    // Create a set of all timestamps within the selected range
    const timestampsSet = new Set();
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      timestampsSet.add(this.formatDate(currentDate, dateFormat));
      if (timeDifferenceInDays <= 1) {
        currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Add 1 day
      } else {
        currentDate.setDate(currentDate.getDate() + 1); // Add 1 day
      }
    }

    // Query database for counts of accounts
    const accountsData = await this.userRepository
      .createQueryBuilder('user')
      .select(
        `DATE_FORMAT(user.created_at, "${dateFormat}") as time, COUNT(*) as number_of_accounts`,
      )
      .where('user.created_at BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy(groupBy)
      .orderBy('time', 'ASC')
      .getRawMany();

    // Merge the result with timestampsSet to ensure all timestamps are included
    const mergedData = Array.from(timestampsSet).map((timestamp) => {
      const existingData = accountsData.find((data) => data.time === timestamp);
      const number_of_user_accounts = existingData
        ? parseInt(existingData.number_of_accounts, 10)
        : 0; // Convert to number
      return { time: timestamp, number_of_user_accounts };
    });

    return mergedData;
  }

  private formatDate(date: Date, format: string): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    return format
      .replace('%Y', year.toString())
      .replace('%m', month)
      .replace('%d', day)
      .replace('%H', hours);
  }

  async getOrderInformation(
    startDate: Date,
    endDate: Date,
  ): Promise<{ time: string; number_of_orders: number }[]> {
    const timeDifferenceInDays = Math.ceil(
      Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
    );

    let dateFormat;
    let groupBy;
    if (timeDifferenceInDays <= 1) {
      // Within a day: group by hour
      dateFormat = '%Y-%m-%d %H:00';
      groupBy = 'DATE_FORMAT(order.created_at, "%Y-%m-%d %H:00:00")';
    } else if (timeDifferenceInDays <= 30) {
      // Within a month: group by day
      dateFormat = '%Y-%m-%d';
      groupBy = 'DATE(order.created_at)';
    } else {
      // Greater than a month: group by month
      dateFormat = '%Y-%m';
      groupBy = 'DATE_FORMAT(order.created_at, "%Y-%m-01")';
    }

    const timestampsSet = new Set();
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      timestampsSet.add(this.formatDate(currentDate, dateFormat));
      if (timeDifferenceInDays <= 1) {
        currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Add 1 day
      } else {
        currentDate.setDate(currentDate.getDate() + 1); // Add 1 day
      }
    }
    const ordersData = await this.orderRepository
      .createQueryBuilder('order')
      .select(
        `DATE_FORMAT(order.created_at, "${dateFormat}") as time, COUNT(*) as number_of_orders`,
      )
      .where('order.created_at BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy(groupBy)
      .orderBy('time', 'ASC')
      .getRawMany();

    const mergedData = Array.from(timestampsSet).map((timestamp) => {
      const existingData = ordersData.find((data) => data.time === timestamp);
      const number_of_orders = existingData
        ? parseInt(existingData.number_of_orders, 10)
        : 0;
      return existingData || { time: timestamp, number_of_orders };
    });

    return mergedData;
  }

  async getUserCountsByRole() {
    const countsByRole = await this.userRepository
      .createQueryBuilder('user')
      .select('user.role AS role, COUNT(user.userId) AS count')
      .groupBy('user.role')
      .getRawMany();

    return countsByRole;
  }

  async getOrdersCounts() {
    const orderCount = await this.orderRepository
      .createQueryBuilder('order')
      .select('COUNT(order.order_id) AS orderCount')
      .getRawOne();
  
    const manualOrderCount = await this.manualOrderRepository
      .createQueryBuilder('manualOrder')
      .select('COUNT(manualOrder.manual_order_id) AS manualOrderCount')
      .getRawOne();
  
    return {
      orderCount: parseInt(orderCount.orderCount),
      manualOrderCount: parseInt(manualOrderCount.manualOrderCount)
    };
  }
}
