import React from "react";

const Dashboard = () => {
  const awsTopics = [
    {
      title: "Getting Started with AWS",
      points: [
        "What is Cloud Computing?",
        "Introduction to AWS Global Infrastructure",
        "Creating an AWS Free Tier Account",
        "Understanding IAM (Identity and Access Management)",
      ],
    },
    {
      title: "Compute Services",
      points: [
        "Amazon EC2: Launch and Manage Virtual Servers",
        "Auto Scaling and Load Balancing",
        "AWS Lambda: Serverless Computing",
        "Elastic Beanstalk: Managed Application Deployment",
      ],
    },
    {
      title: "Storage and Databases",
      points: [
        "Amazon S3: Object Storage",
        "EBS and EFS: Block and File Storage",
        "Amazon RDS: Relational Database Service",
        "DynamoDB: NoSQL Database",
      ],
    },
    {
      title: "Networking and Security",
      points: [
        "VPC: Virtual Private Cloud",
        "AWS Route 53: DNS and Domain Management",
        "AWS CloudFront: Content Delivery Network",
        "AWS Security Best Practices",
      ],
    },
    {
      title: "Advanced and DevOps Tools",
      points: [
        "AWS CloudFormation: Infrastructure as Code",
        "AWS CI/CD Tools: CodeBuild, CodePipeline",
        "AWS Monitoring with CloudWatch",
        "AWS Certification Path and Career Guidance",
      ],
    },
  ];

  return (
    <div className="dashboard">
      <h2>Welcome to the AWS Learning Dashboard</h2>
      <p>Start your journey from basics to advanced AWS topics.</p>

      {awsTopics.map((section, index) => (
        <div key={index} className="topic-section">
          <h3>{section.title}</h3>
          <ul>
            {section.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
