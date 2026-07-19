'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@codesync/database';

export async function createOrganization(data: { name: string; slug: string }) {
  try {
    const org = await prisma.organization.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });
    revalidatePath('/dashboard/team');
    return { success: true, organization: org };
  } catch (error) {
    return { success: false, error: 'Failed to create organization' };
  }
}

export async function createTeam(data: { organizationId: string; name: string; slug: string; description?: string }) {
  try {
    const team = await prisma.team.create({
      data: {
        organizationId: data.organizationId,
        name: data.name,
        slug: data.slug,
        description: data.description,
      },
    });
    revalidatePath('/dashboard/team/teams');
    return { success: true, team };
  } catch (error) {
    return { success: false, error: 'Failed to create team' };
  }
}

export async function inviteMember(data: { organizationId: string; email: string; roleId?: string }) {
  try {
    const token = crypto.randomUUID();
    // Expiration 7 days from now
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
    const invitation = await prisma.organizationInvitation.create({
      data: {
        organizationId: data.organizationId,
        email: data.email,
        roleId: data.roleId,
        token,
        expiresAt,
      },
    });
    
    // Stub: In a real app, we'd send an email via Resend here.
    console.log(`Mock Email sent to ${data.email} with token: ${token}`);
    
    revalidatePath('/dashboard/team/invitations');
    return { success: true, invitation };
  } catch (error) {
    return { success: false, error: 'Failed to invite member' };
  }
}

export async function removeMember(data: { organizationId: string; userId: string }) {
  try {
    await prisma.organizationMember.delete({
      where: {
        organizationId_userId: {
          organizationId: data.organizationId,
          userId: data.userId,
        },
      },
    });
    revalidatePath('/dashboard/team/members');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to remove member' };
  }
}

export async function changeRole(data: { organizationId: string; userId: string; roleId: string }) {
  try {
    await prisma.organizationMember.update({
      where: {
        organizationId_userId: {
          organizationId: data.organizationId,
          userId: data.userId,
        },
      },
      data: {
        roleId: data.roleId,
      },
    });
    revalidatePath('/dashboard/team/members');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to change role' };
  }
}
