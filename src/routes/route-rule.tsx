import React from 'react';
import {Navigate} from 'react-router-dom';
import {ability} from '../utils/define-ability';

interface RouteRuleProps {
  children: React.ReactNode;
  action: 'read' | 'write';
  ruleName: string;
}

export const RouteRule: React.FC<RouteRuleProps> = ({
  children,
  action,
  ruleName,
}: RouteRuleProps) => {
  const canNavigate = ability.can(action, ruleName);
  return canNavigate === true ? children : <Navigate to="/dashboard" replace />;
};
