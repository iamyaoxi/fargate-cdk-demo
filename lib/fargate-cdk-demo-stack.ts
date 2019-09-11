import cdk = require('@aws-cdk/core')
import { ContainerImage, Cluster, FargateTaskDefinition, EcrImage, FargateService } from '@aws-cdk/aws-ecs';
import { Repository } from '@aws-cdk/aws-ecr';

export class FargateCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const cluster = new Cluster(this, "fargate-demo")

    /**
     * Retrieve our Docker images from ECR Repository
     */
    const app = ContainerImage.fromEcrRepository(
      Repository.fromRepositoryArn(this, 'app-ecr', 'YOUR_ARN')
    )
    const web = ContainerImage.fromEcrRepository(
      Repository.fromRepositoryArn(this, 'app-ecr', 'YOUR_ARN')
    )
    const redis = ContainerImage.fromRegistry('redis')

    const taskDefinition = new FargateTaskDefinition(this, "laravel-task-definition", {
      'cpu': 256,
      'memoryLimitMiB': 512,
    })

    taskDefinition.addContainer("app", {
      'image': app,

      /**
       * You can also put Environment Variables that usually in .env here
       */
      'environment': {
        'APP_KEY': 'YOUR_KEY',
        'ENV_VARIABLE_KEY': 'ENV_VARIABLE_VALUE'
      }
    })
    taskDefinition.addContainer('web', {
      'image': web
    })
    taskDefinition.addContainer('redis', {
      'image': redis
    })

    /**
     * Add shared volume to be used by the containers
     */
    taskDefinition.addVolume({'name' : 'app'})
  }
}
