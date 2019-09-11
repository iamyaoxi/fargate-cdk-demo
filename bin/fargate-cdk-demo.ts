#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { FargateCdkStack } from '../lib/fargate-cdk-demo-stack';

const app = new cdk.App();
new FargateCdkStack(app, 'FargateCdkStack', {
    env: {
        region: 'REGION',
        account: 'ACCOUNT_ID' 
    }
});