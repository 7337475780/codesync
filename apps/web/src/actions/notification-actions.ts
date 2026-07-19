'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@codesync/database';

export async function markAsRead(id: string) {
  try {
    await prisma.notification.update({
      where: { id },
      data: { status: 'READ' }
    });
    revalidatePath('/dashboard/notifications');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to mark as read' };
  }
}

export async function markAllAsRead(userId: string) {
  try {
    await prisma.notification.updateMany({
      where: { userId, status: 'UNREAD' },
      data: { status: 'READ' }
    });
    revalidatePath('/dashboard/notifications');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to mark all as read' };
  }
}

export async function archiveNotification(id: string) {
  try {
    await prisma.notification.update({
      where: { id },
      data: { status: 'ARCHIVED' }
    });
    revalidatePath('/dashboard/notifications');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to archive notification' };
  }
}

export async function deleteNotification(id: string) {
  try {
    await prisma.notification.delete({
      where: { id }
    });
    revalidatePath('/dashboard/notifications');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete notification' };
  }
}

export async function updatePreference(userId: string, category: string, channel: string, data: { enabled?: boolean; frequency?: string }) {
  try {
    await prisma.notificationPreference.upsert({
      where: {
        userId_category_channel: { userId, category, channel }
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
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update preference' };
  }
}
