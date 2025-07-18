'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Account = {
  id: string;
  name: string;
  type: string;
  email?: string;
  phone?: string;
  status?: string;
};

type Platform = {
  id: string;
  name: string;
  type: string;
  url: string;
  apiKey: string;
  status?: string;
};

type AccountPlatform = {
  accountId: string;
  platformId: string;
};

type PlatformContextType = {
  accounts: Account[];
  platforms: Platform[];
  accountPlatforms: AccountPlatform[];
  addAccount: (account: Omit<Account, 'id'>) => string;
  addPlatform: (platform: Omit<Platform, 'id'>) => string;
  linkAccountPlatform: (accountId: string, platformId: string) => void;
  getAccountPlatforms: (accountId: string) => Platform[];
  getPlatformAccounts: (platformId: string) => Account[];
  deleteAccount: (accountId: string) => void;
};

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [accountPlatforms, setAccountPlatforms] = useState<AccountPlatform[]>([]);

  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount = {
      ...account,
      id: Math.random().toString(36).substring(2, 9),
      status: account.status || 'active',
    };
    setAccounts([...accounts, newAccount]);
    return newAccount.id;
  };

  const addPlatform = (platform: Omit<Platform, 'id'>) => {
    const newPlatform = {
      ...platform,
      id: Math.random().toString(36).substring(2, 9),
      status: platform.status || 'active',
    };
    setPlatforms([...platforms, newPlatform]);
    return newPlatform.id;
  };
  
  const linkAccountPlatform = (accountId: string, platformId: string) => {
    // Check if the link already exists
    const exists = accountPlatforms.some(
      link => link.accountId === accountId && link.platformId === platformId
    );
    
    if (!exists) {
      setAccountPlatforms([...accountPlatforms, { accountId, platformId }]);
    }
  };
  
  const getAccountPlatforms = (accountId: string): Platform[] => {
    const links = accountPlatforms.filter(link => link.accountId === accountId);
    return links.map(link => platforms.find(p => p.id === link.platformId)!).filter(Boolean);
  };
  
  const getPlatformAccounts = (platformId: string): Account[] => {
    const links = accountPlatforms.filter(link => link.platformId === platformId);
    return links.map(link => accounts.find(a => a.id === link.accountId)!).filter(Boolean);
  };

  // Delete an account and its links
  const deleteAccount = (accountId: string) => {
    setAccounts(prev => prev.filter(acc => acc.id !== accountId));
    setAccountPlatforms(prev => prev.filter(link => link.accountId !== accountId));
  };

  return (
    <PlatformContext.Provider value={{
      accounts,
      platforms,
      accountPlatforms,
      addAccount,
      addPlatform,
      linkAccountPlatform,
      getAccountPlatforms,
      getPlatformAccounts,
      deleteAccount
    }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
}