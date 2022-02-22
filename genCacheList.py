import os
import json
import re

# sollte ueber console liste ignoreFiles erhalten können, damit man nicht
# direkt das skript manipulieren muss
# oder pfad mit liste in JSON-Format
# Folder-Name sollte auch automatisiert als Präfix angefügt werden´

# !!!!!!!!!!!!!!!
# oder konfigurations-file für genCacheList Skript -> JSON-Format
# !!!!!!!!!!!!!!!


ignoreFiles = ["genCacheList", "draw", "register", "cacheablefiles", "git"]
listOfAllFiles = []
def listAllFiles(file):
    file = "/" + file
    file = file.replace("./", "")
    if "." not in file.split("/")[-1]:
        return
    listOfAllFiles.append(file)

def fileShouldBeIgnored(file):
    foundInList = list(filter(lambda x: x in file, ignoreFiles))
    return bool(foundInList)


def scourDirsForSW(path):
    root = os.getcwd()
    dirs = os.listdir(root + "/" + path)
    for i in dirs:
        newPath = path + "/" + i
        print(newPath)
        if os.path.isdir(root + "/" +newPath):
            if fileShouldBeIgnored(newPath) == True:
                #print(newPath
                #Q.setQuestionNr(newPath.split("/")[-1])
                #Q.reset()
                #print(newPath)
                continue
                
            else:
                listAllFiles("."+newPath)
                scourDirsForSW(newPath)
                
                
        else:
            if fileShouldBeIgnored(newPath) == True:

                continue
                #Q.sortFiles(i)
                
            else:
                #print(newPath)
                listAllFiles("."+newPath)

scourDirsForSW("")
with open("./cacheablefiles.js", "w") as w:
    newData = "const FILES = " + json.dumps(listOfAllFiles)
    w.write(newData)