/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { getOr } from 'lodash/fp';
import memoizeOne from 'memoize-one';
import React from 'react';
import { Query } from 'react-apollo';
import chrome from 'ui/chrome';

import { DEFAULT_INDEX_KEY } from '../../../../common/constants';
import { DetailItem, GetTimelineDetailsQuery } from '../../../graphql/types';

import { timelineDetailsQuery } from './index.gql_query';

export interface EventsArgs {
  detailsData: DetailItem[] | null;
  loading: boolean;
}

export interface TimelineDetailsProps {
  children?: (args: EventsArgs) => React.ReactElement;
  indexName: string;
  eventId: string;
  executeQuery: boolean;
  sourceId: string;
}

export const TimelineDetailsComponentQuery = React.memo<TimelineDetailsProps>(
  ({ children, indexName, eventId, executeQuery, sourceId }) => {
    const getDetailsEvent = (variables: string, detail: DetailItem[]): DetailItem[] => detail;
    const getDetailsEventMemo = memoizeOne(getDetailsEvent);

    const variables: GetTimelineDetailsQuery.Variables = {
      sourceId,
      indexName,
      eventId,
      defaultIndex: chrome.getUiSettingsClient().get(DEFAULT_INDEX_KEY),
    };
    return executeQuery ? (
      <Query<GetTimelineDetailsQuery.Query, GetTimelineDetailsQuery.Variables>
        query={timelineDetailsQuery}
        fetchPolicy="network-only"
        notifyOnNetworkStatusChange
        variables={variables}
      >
        {({ data, loading, refetch }) => {
          return children!({
            loading,
            detailsData: getDetailsEventMemo(
              JSON.stringify(variables),
              getOr([], 'source.TimelineDetails.data', data)
            ),
          });
        }}
      </Query>
    ) : (
      children!({ loading: false, detailsData: null })
    );
  }
);
