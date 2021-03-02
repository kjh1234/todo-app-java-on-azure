def isHook = params.IS_HOOK
def tagVersion = ''
pipeline {
  agent any
  parameters {
    booleanParam(name: 'ALL_STEPS', defaultValue: false, description: '')
    booleanParam(name: 'IS_HOOK', defaultValue: false, description: '')
    string(name: 'TAG_VERSION', defaultValue: '', description: '')
  }
  
  node('master') {

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
            tagVersion = params.TAG_VERSION
            if ((params.ALL_STEPS == true || isHook == false ) && params.TAG_VERSION == '') {
                error "TAG_VERSION is required"
            } else {
                echo 'Tag return github'
                TAG_VERSION=$(git describe --tags --abbrev=0)
                sh """
                  last_version="\$(git describe --tags --abbrev=0)"
                  echo "\$last_version" >last_version
                """
              tagVersion =  readFile('last_version').trim()
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
