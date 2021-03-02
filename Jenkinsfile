def isHook = params.IS_HOOK
def tagVersion = ''
pipeline {
  agent any
  parameters {
    booleanParam(name: 'ALL_STEPS', defaultValue: false, description: '')
    booleanParam(name: 'IS_HOOK', defaultValue: false, description: '')
    string(name: 'TAG_VERSION', defaultValue: '', description: '')
  }
  
  stages {

    stage('INIT_PIPILINE') {
      steps {
        
        script {
            if (params.ALL_STEPS == true) {
                isHook = true
            }
        }
      }
    }

    stage('SCM') {
        when {
            expression { return isHook == true; }
        }
      steps {
        echo " The SCM"
        
        script {
            if (params.ALL_STEPS == true && params.TAG_VERSION == '') {
                error "TAG_VERSION is required"
            } else {
                echo 'Tag return github'
            }
        }
       /*currentBuild.result = 'SUCCESS'
       return */ 
      }
    }
    
    stage('BUILD') {
        when {
            expression { return params.ALL_STEPS == true || isHook == true; }
        }
      steps {
        echo " The BUILD"
      }
    }
    
    stage('PUSH IMAGE') {
        when {
            expression { return params.ALL_STEPS == true || isHook == true; }
        }
      steps {
        echo " PUSH IMAGE"
      }
    }
    
    stage('DEPLOY') {
        when {
            expression { return params.ALL_STEPS == true || isHook == false; }
        }
      steps {
        echo " DEPLOY"
      }
    }
    
    stage('Blue/Green Swich') {
        when {
            expression { return params.ALL_STEPS == true || isHook == false; }
        }
      steps {
        echo " Blue/Green Swich"
      }
    }

  }
  environment {
    version = ''
  }
}
