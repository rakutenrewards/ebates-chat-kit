properties([
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', numToKeepStr: '5']]
])

node {
    env.NODEJS_HOME = "${tool 'Node 10.1.0'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

    environment {
        CLOUDSDK_PYTHON_SITEPACKAGES='1'
    }

    try {
      def edcEnv = 'test'
      def nodeEnv = 'development'
      if (env.BRANCH_NAME == 'master') {
        edcEnv = 'prod-innovation'
        nodeEnv = 'production'
      }
      else if (env.BRANCH_NAME == 'develop') {
        edcEnv = 'dev-innovation'
      }

      stage('Checkout') {
          deleteDir()
          checkout scm
      }

      withEnv(["EDC_ENV=${edcEnv}", "CI=true", "NODE_ENV=${nodeEnv}"]) {
        withCredentials([string(credentialsId: 'FIREBASE_TOKEN', variable: 'FIREBASE_TOKEN')]) {
          stage('Prepare') {
            sh 'npm install --global yarn'
            sh 'NODE_ENV=development yarn install'
          }
          stage('Test') {
            sh 'yarn lint  && yarn test'
          }
          stage('Build') {
            sh 'yarn build'
          }
          stage('Docs Build') {
            sh 'yarn docs'
          }
          if (edcEnv != 'test') {
            stage('Deploy') {
              def gcsBucket = "${edcEnv}-chat"
              echo "Deploying to ${gcsBucket} ..."
              sh "gsutil rsync -r dist gs://${gcsBucket}/bubbles"
              sh "gsutil rsync -r styleguide gs://${gcsBucket}/bubbles"
              sh "gsutil acl ch -u AllUsers:R gs://${gcsBucket}/*"
              sh "gcloud compute url-maps invalidate-cdn-cache ${gcsBucket}-lb --path \"/bubbles/*\" --async --project ${edcEnv}"
            }
          }
        }
      }
    }
    catch (e) {
      currentBuild.result = "FAILED"
      throw e
    }
    finally {
      notifyBuild()
    }
}

def notifyBuild() {
  def previousResult = currentBuild.previousBuild?.result
  if (previousResult && previousResult != currentBuild.currentResult) {
    echo currentBuild.currentResult
    if (currentBuild.currentResult == 'SUCCESS') {
      hipchatSend (color: 'GREEN', notify: true, message: "BACK TO NORMAL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
    else {
      hipchatSend (color: 'RED', notify: true, message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
  }
}
