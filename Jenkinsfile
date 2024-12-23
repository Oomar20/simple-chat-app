pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t my-app:latest .'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker run -d -p 3000:3000 my-app:latest'
      }
    }
    stage('Monitor Application') {
      steps {
        script {
          def response = sh(returnStatus: true, script: "curl -o /dev/null -s -w '%{http_code}' http://localhost:3000")
          if (response != 200) {
            error "Application is down or unresponsive"
          }
        }
      }
    }
    stage('Rollback') {
      when {
        expression { currentBuild.result == 'FAILURE' }
      }
      steps {
        echo 'Rolling back to last stable version...'
        sh 'docker run -d -p 3000:3000 my-app:stable'
      }
    }
  }
  post {
    success {
      echo 'Build and deployment successful!'
    }
    failure {
      echo 'Build failed, initiating rollback...'
    }
  }
}
