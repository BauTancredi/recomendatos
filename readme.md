RECOMENDATOS

git branch | grep -v main | grep -v dev | grep -v "$(git remote show origin | grep 'tracked' | awk '{print $1}')" | xargs git branch -d
