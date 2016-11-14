# bandlabtest
test for bandlab

## Requirement
- [serverless framework](https://serverless.com)
- configure aws credentials
- npm

## Verifying test
```
git clone https://github.com/Misterhex/bandlabtest/
cd bandlabtest 
npm install
serverless deploy
curl https://xxx.execute-api.us-east-1.amazonaws.com/dev/comments/10 | jq  
/// replace xxx with the deployed api gateway from stdout when running 'server deploy'
/// go to cloudwatch and verify output.
```

