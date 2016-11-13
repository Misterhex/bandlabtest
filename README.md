# bandlabtest
test for bandlab

## Requirement
- [serverless framework](https://serverless.com)
- configure aws credentials

## Verifying test
```
git clone https://github.com/Misterhex/bandlabtest/
cd bandlabtest 
serverless deploy
curl https://xxxxxx.execute-api.us-east-1.amazonaws.com/dev/comments/10 | jq  /// curl the single endpoint output from the stdout.
```

