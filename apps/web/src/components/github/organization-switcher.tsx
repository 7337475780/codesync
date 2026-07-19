"use client";

import React, { useEffect, useState } from 'react';
import { Check, ChevronsUpDown, Github, Building } from 'lucide-react';
import { useGithubStore } from '@/store/github-store';
import { motion, AnimatePresence } from 'framer-motion';

export const OrganizationSwitcher = () => {
  const { account, organizations, activeOrganizationId, setActiveOrganization, fetchAccount, fetchOrganizations } = useGithubStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchAccount();
    fetchOrganizations();
  }, [fetchAccount, fetchOrganizations]);

  const activeOrg = organizations.find(o => o.id === activeOrganizationId);

  return (
    <div className="relative w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select organization"
        className="w-full flex items-center justify-between p-2 border border-border bg-surface hover:bg-muted/50 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {activeOrg ? (
            <img src={activeOrg.avatarUrl} alt="" className="w-5 h-5 rounded-md object-cover" />
          ) : account ? (
            <img src={account.avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
          ) : (
            <Github className="w-5 h-5 text-muted-foreground" />
          )}
          <span className="text-sm font-medium truncate">
            {activeOrg ? activeOrg.login : account ? account.username : 'Loading...'}
          </span>
        </div>
        <ChevronsUpDown className="w-4 h-4 text-muted-foreground shrink-0" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 w-full mt-1 bg-surface border border-border rounded-md shadow-lg z-50 overflow-hidden"
          >
            <div className="p-1">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Personal
              </div>
              <button
                onClick={() => {
                  setActiveOrganization(null);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2 py-1.5 text-sm rounded-sm hover:bg-muted ${!activeOrganizationId ? 'bg-primary/10 text-primary' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <img src={account?.avatarUrl} alt="" className="w-4 h-4 rounded-full" />
                  <span>{account?.username}</span>
                </div>
                {!activeOrganizationId && <Check className="w-4 h-4" />}
              </button>

              {organizations.length > 0 && (
                <>
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2 border-t border-border pt-2">
                    Organizations
                  </div>
                  {organizations.map(org => (
                    <button
                      key={org.id}
                      onClick={() => {
                        setActiveOrganization(org.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2 py-1.5 text-sm rounded-sm hover:bg-muted ${activeOrganizationId === org.id ? 'bg-primary/10 text-primary' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <img src={org.avatarUrl} alt="" className="w-4 h-4 rounded-md" />
                        <span>{org.login}</span>
                      </div>
                      {activeOrganizationId === org.id && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
