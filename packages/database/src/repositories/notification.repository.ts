import { BaseRepository } from './base.repository';
import type { Notification, NotificationPreference, Prisma } from '@prisma/client';

export class NotificationRepository extends BaseRepository<Notification> {
  async findById(id: string) {
    return this.db.notification.findUnique({
      where: { id },
      include: {
        activityEvent: true,
        deliveries: true,
        mentions: true
      }
    });
  }

  async findByUserId(userId: string, options: { 
    status?: string, 
    category?: string, 
    limit?: number, 
    offset?: number 
  } = {}) {
    const where: Prisma.NotificationWhereInput = { userId };
    if (options.status) where.status = options.status;
    if (options.category) where.category = options.category;

    return this.db.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: options.limit || 50,
      skip: options.offset || 0,
      include: {
        activityEvent: true
      }
    });
  }

  async countUnread(userId: string) {
    return this.db.notification.count({
      where: {
        userId,
        status: 'UNREAD'
      }
    });
  }

  async create(data: Prisma.NotificationCreateInput) {
    return this.db.notification.create({
      data,
      include: {
        activityEvent: true
      }
    });
  }

  async markAsRead(id: string) {
    return this.db.notification.update({
      where: { id },
      data: { status: 'READ' }
    });
  }

  async markAllAsRead(userId: string) {
    return this.db.notification.updateMany({
      where: { 
        userId,
        status: 'UNREAD'
      },
      data: { status: 'READ' }
    });
  }

  async archive(id: string) {
    return this.db.notification.update({
      where: { id },
      data: { status: 'ARCHIVED' }
    });
  }

  async delete(id: string) {
    return this.db.notification.delete({
      where: { id }
    });
  }

  // Preferences
  async getPreferences(userId: string) {
    return this.db.notificationPreference.findMany({
      where: { userId }
    });
  }

  async updatePreference(userId: string, category: string, channel: string, data: Partial<NotificationPreference>) {
    return this.db.notificationPreference.upsert({
      where: {
        userId_category_channel: {
          userId,
          category,
          channel
        }
      },
      update: data,
      create: {
        userId,
        category,
        channel,
        enabled: data.enabled ?? true,
        frequency: data.frequency ?? 'INSTANT'
      }
    });
  }
}

export const notificationRepository = new NotificationRepository();
