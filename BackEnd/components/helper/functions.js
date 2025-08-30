import pdf from 'pdf-parse'
import stringSimilarity from 'string-similarity'


export async function parsePDF(fileBuffer){
    // console.log('hehe')
    let skillsArray = ['A/B Testing', 'AKS', 'ASP.NET', 'AWS', 'AWS SageMaker', 'AWS Security', 'Angular', 'Ansible', 'Apache Airflow', 'Apache Flink', 'Apache Kafka', 'Apache NiFi', 'Apache Spark', 'Apache Storm', 'Appium', 'ArcSight', 'Azure', 'Azure DevOps', 'Azure ML', 'Azure Monitor', 'Azure Security', 'Bash', 'BeautifulSoup', 'Behave', 'BigQuery', 'Blob Storage', 'Bootstrap', 'Burp Suite', 'C#', 'CDN', 'CSS', 'Cassandra', 'Celery', 'CentOS', 'Cloud Functions', 'Cloud Security', 'Cloud Storage', 'CloudFormation', 'CloudWatch', 'Compute Engine', 'Context API', 'Cucumber', 'Cypress', 'DAST', 'DNS', 'DVC', 'Dask', 'Databricks', 'Datadog', 'DigitalOcean', 'Django', 'Docker', 'EC2', 'EKS', 'ELK Stack', 'Eclipse', 'Elasticsearch', 'Espresso', 'Express', 'FastAPI', 'Figma', 'Flask', 'Flutter', 'Functions', 'GDPR', 'GKE', 'Gin', 'Git', 'GitHub Actions', 'GitLab CI', 'Go', 'Google Cloud', 'Gradle', 'Grafana', 'GraphQL', 'Gunicorn', 'HTML', 'Helm', 'Heroku', 'Hibernate', 'Hypothesis Testing', 'IAM', 'ISO 27001', 'IntelliJ IDEA', 'Ionic', 'Istio', 'JIRA', 'JMeter', 'JPA', 'JSP', 'JUnit', 'Java', 'JavaScript', 'Jenkins', 'Jest', 'Jupyter', 'Kafka', 'Kali Linux', 'Keras', 'Key Management', 'Kubeflow', 'Kubernetes', 'Lambda', 'Less', 'LightGBM', 'Linux', 'Load Balancers', 'LoadRunner', 'MLflow', 'Material UI', 'Matplotlib', 'Maven', 'Metasploit', 'Microservices', 'MobX', 'Mocha', 'Mock', 'Mockito', 'MongoDB', 'MySQL', 'Nessus', 'Netlify', 'Next.js', 'NgRx', 'Nginx', 'Nmap', 'Node.js', 'NumPy', 'OWASP ZAP', 'OpenVAS', 'Oracle', 'PCI DSS', 'Pandas', 'Parcel', 'Parrot OS', 'Penetration Testing', 'Pentaho', 'Playwright', 'Plotly', 'Podman', 'PostgreSQL', 'Postman', 'Power BI', 'PowerShell', 'Prometheus', 'Pulumi', 'PyCharm', 'PyTorch', 'Pytest', 'Python', 'QRadar', 'R', 'R Studio', 'RDS', 'REST APIs', 'REST Assured', 'RabbitMQ', 'React', 'React Native', 'React Testing Library', 'Redis', 'Redis Pub/Sub', 'Redshift', 'Redux', 'Requests', 'Rollup', 'S3', 'SASS', 'SAST', 'SOAP', 'SOC 2', 'SQL', 'SQLAlchemy', 'SQLite', 'Scala', 'SciPy', 'Seaborn', 'Security Groups', 'Seldon', 'Selenium', 'Servlets', 'Snowflake', 'SoapUI', 'Spark', 'SpecFlow', 'Splunk', 'Spring Boot', 'Spring Framework', 'Stackdriver', 'Statistics', 'Styled Components', 'Svelte', 'Tableau', 'Tailwind CSS', 'Talend', 'TensorFlow', 'TensorFlow Serving', 'Terraform', 'TestNG', 'Testing Library', 'TypeScript', 'Ubuntu', 'Unittest', 'VPC', 'VS Code', 'Vault', 'Vercel', 'Virtual Machines', 'Vite', 'Vue.js', 'Vuex', 'Vulnerability Assessment', 'WebSockets', 'Webpack', 'Weights & Biases', 'Windows Server', 'Wireshark', 'XCUITest', 'XGBoost', 'Zustand', 'containerd', 'dbt', 'gRPC', 'k6', 'npm', 'pandas', 'scikit-learn', 'uWSGI', 'yarn'];
    const data = await pdf(fileBuffer);
    const text = data.text.toLowerCase();
    const foundSkills = skillsArray.filter(skill => {
            const skillLower = skill.toLowerCase();
            const similarity = stringSimilarity.findBestMatch(skillLower, text.split(/\s+/));
            // Count as match if similarity > 0.6 (adjust threshold)
            return similarity.bestMatch.rating > 0.75;
        });
    // console.log((foundSkills));
    return foundSkills;

}