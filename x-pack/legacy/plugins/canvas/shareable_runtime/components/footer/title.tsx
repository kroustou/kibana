/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { FC } from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiIcon, EuiText } from '@elastic/eui';
import { useCanvasShareableState } from '../../context';

interface Props {
  /**
   * The title of the workpad being shared.
   */
  title: string;
}

/**
 * The title of the workpad displayed in the left-hand of the footer.
 */
export const TitleComponent: FC<Props> = ({ title }) => (
  <EuiFlexGroup gutterSize="s" justifyContent="flexStart" alignItems="center">
    <EuiFlexItem grow={false}>
      <EuiIcon type="logoKibana" size="m" />
    </EuiFlexItem>
    <EuiFlexItem grow={false} style={{ minWidth: 0, cursor: 'default' }}>
      <EuiText color="ghost" size="s">
        <div className="eui-textTruncate">{title}</div>
      </EuiText>
    </EuiFlexItem>
  </EuiFlexGroup>
);

/**
 * A store-connected container for the `Title` component.
 */
export const Title: FC<{}> = () => {
  const [{ workpad }] = useCanvasShareableState();

  if (!workpad) {
    return null;
  }

  const { name: title } = workpad;

  return <TitleComponent {...{ title }} />;
};
