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
  ): Promise<{ time: string; number_of_accounts: number }[]> {
    const timeDifferenceInDays = Math.ceil(
      Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
    );
    const timeDifferenceInHours = Math.ceil(
      Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600),
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

    // Create an array of all intervals between startDate and endDate
    const intervals = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      intervals.push(currentDate.toISOString());
      if (timeDifferenceInDays <= 1) {
        currentDate = new Date(currentDate.getTime() + 60 * 60 * 1000); // Add 1 hour
      } else {
        currentDate.setDate(currentDate.getDate() + 1); // Add 1 day
      }
    }

    // Merge the result with the intervals to include all intervals even if the count is zero
    const mergedData = intervals.map((interval) => {
      const existingData = accountsData.find((data) => data.time === interval);
      return existingData || { time: interval, number_of_accounts: 0 };
    });

    return mergedData;
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

    return ordersData;
  }
}
