pipeline {
  agent any
  stages {
    stage('VMSS_APP_BUILD') {
      parallel {
        stage('VMSS_APP_BUILD') {
          steps {
            build 'AZURE VMSS/00.VMSS_APP_BUILD'
          }
        }

        stage('VMSS_PROVIS') {
          steps {
            build 'AZURE VMSS/01.VMSS_PROVIS'
          }
        }

      }
    }

    stage('') {
      steps {
        build 'AZURE VMSS/03.VMSS_GREEN_DEPLOY'
      }
    }

  }
}