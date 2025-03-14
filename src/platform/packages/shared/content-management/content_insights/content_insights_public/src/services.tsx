/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { FC, PropsWithChildren, useContext } from 'react';
import React from 'react';

import { ContentInsightsClientPublic } from './client';

/**
 * Abstract external services for this component.
 */
export interface ContentInsightsServices {
  contentInsightsClient: ContentInsightsClientPublic;
  /**
   * Whether versioning is enabled for the current kibana instance. (aka is Serverless)
   * This is used to determine if we should show the version mentions in the help text.
   */
  isKibanaVersioningEnabled: boolean;
}

const ContentInsightsContext = React.createContext<ContentInsightsServices | null>(null);

/**
 * Abstract external service Provider.
 */
export const ContentInsightsProvider: FC<PropsWithChildren<Partial<ContentInsightsServices>>> = ({
  children,
  ...services
}) => {
  if (!services.contentInsightsClient) {
    return <>{children}</>;
  }

  return (
    <ContentInsightsContext.Provider
      value={{
        contentInsightsClient: services.contentInsightsClient,
        isKibanaVersioningEnabled: services.isKibanaVersioningEnabled ?? false,
      }}
    >
      {children}
    </ContentInsightsContext.Provider>
  );
};

/*
 * React hook for accessing pre-wired services.
 */
export function useServices() {
  const context = useContext(ContentInsightsContext);
  return context;
}
