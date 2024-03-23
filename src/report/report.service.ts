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

    let dateFormat;
    let groupBy;
    let interval;
    if (timeDifferenceInDays <= 1) {
      // Within a day: group by hour
      dateFormat = '%Y-%m-%d %H:00';
      groupBy = 'DATE_FORMAT(user.created_at, "%Y-%m-%d %H:00:00")';
      interval = 'hour';
    } else if (timeDifferenceInDays <= 30) {
      // Within a month: group by day
      dateFormat = '%Y-%m-%d';
      groupBy = 'DATE(user.created_at)';
      interval = 'day';
    } else {
      // Greater than a month: group by month
      dateFormat = '%Y-%m';
      groupBy = 'DATE_FORMAT(user.created_at, "%Y-%m-01")';
      interval = 'month';
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

    // Create a set of all intervals within the selected range
    const intervalsSet = new Set();
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      intervalsSet.add(currentDate.toISOString());
      currentDate = this.incrementInterval(currentDate, interval);
    }

    // Merge the result with intervalsSet to ensure all intervals are included
    const mergedData = Array.from(intervalsSet).map((intervalTime) => {
      const existingData = accountsData.find(
        (data) => data.time === intervalTime,
      );
      return existingData || { time: intervalTime, number_of_accounts: 0 };
    });

    return mergedData;
  }

  private incrementInterval(date: Date, interval: string): Date {
    switch (interval) {
      case 'hour':
        return new Date(date.getTime() + 60 * 60 * 1000); // Add 1 hour
      case 'day':
        return new Date(date.getTime() + 24 * 60 * 60 * 1000); // Add 1 day
      case 'month':
        return new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate(),
        ); // Add 1 month
      default:
        return date;
    }
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
