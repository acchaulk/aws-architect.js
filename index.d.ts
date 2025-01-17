interface PackageMetadata {
  name: string;
  version: string;
}

interface ApiOptions {
  regions: string[];
  deploymentBucket: string,
  sourceDirectory: string,
  description: string,
}

interface ContentOptions {
  bucket: string;
  contentDirectory: string;
}

interface PublishLambdaOptions {
  zipFileName: string;
  bucket: string;
  autoHandleCompileOfSourceDirectory: boolean;
}

interface PublishZipOptions {
  zipFileName: string;
  sourceDirectory: string;
}

interface StackConfiguration {
  changeSetName: string;
  stackName: string;
  automaticallyProtectStack: boolean;
}

interface StackSetConfiguration {
  changeSetName: string;
  stackSetName: string;
  regions: string[];
}

interface OrganizationalStackSetConfiguration {
  changeSetName: string;
  stackSetName: string;
}


interface StageDeploymentOptions {
  stage: string;
  functionName: string;
  deploymentBucketName: string;
  deploymentKeyName: string;
}

interface RegexOption {
  explicit?: string,
  regex?: RegExp,
  value: string | number
}

interface WebsiteDeploymentOptions {
  cacheControlRegexMap?: RegexOption[];
  contentTypeMappingOverride?: object;
}

declare class AwsArchitect {
  constructor(packageMetadata: PackageMetadata, apiOptions: ApiOptions, contentOptions: ContentOptions);

  publishZipArchive(options: PublishZipOptions): Promise<object>;

  /* CloudFormation */
  // CloudFormation related handlers:
  validateTemplate(stackTemplate: object): Promise<object>;
  deployTemplate(stackTemplate: object, stackConfiguration: StackConfiguration, parameters: object): Promise<object>;
  deployStackSetTemplate(stackTemplate: object, stackSetConfiguration: StackSetConfiguration, parameters: object): Promise<object>;
  configureStackSetForAwsOrganization(stackTemplate: object, stackSetConfiguration: OrganizationalStackSetConfiguration, parameters: object): Promise<object>;
  /* ****** */

  /* API Gateway */
  // Support for API Gateway stages
  deployStagePromise(stage: string, lambdaVersion: string): Promise<object>;
  removeStagePromise(stage: string, functionName: string): Promise<object>;
  publishAndDeployStagePromise(options: StageDeploymentOptions): Promise<object>;
  /* ****** */

  /* Lambda Functions */
  // Package a lambda and push it to S3 for deployment
  publishLambdaArtifactPromise(options: PublishLambdaOptions): Promise<object>;
  // Clean up Lambda functions versions that aren't being used
  cleanupPreviousFunctionVersions(functionName: string, forceRemovalOfAliases: string): Promise<object>;
  // Deploy a new version of a lambda function alias
  deployLambdaFunctionVersion(options: StageDeploymentOptions): Promise<object>;
  // Run your lambda microservice locally
  run(port: number, logger: Function): Promise<object>;
  /* ****** */

  /* S3 Websites using CloudFront */
  // Deploy a new version of a website to S3
  publishWebsite(version: string, options: WebsiteDeploymentOptions): Promise<object>;
  // Delete a version of the website from S3
  deleteWebsiteVersion(version: string): Promise<object>;
  /* ****** */
}

export = AwsArchitect;
