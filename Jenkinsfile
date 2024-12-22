pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                script {
                    sh 'docker build -t app-name .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                // Run the Docker container
                script {
                    sh 'docker run -d -p 8080:80 --name app-container app-name'
                }
            }
        }
    }

    post {
        always {
            // Cleanup after the pipeline
            script {
                sh 'docker stop app-container || true'
                sh 'docker rm app-container || true'
            }
        }
    }
}
