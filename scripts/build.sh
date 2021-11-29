#!/bin/sh

echo "Docker image: $REGISTRY_IMAGE_NAME:$TAG"

docker build \
  --build-arg LUMIN_BUILD_NUMBER=$CI_PIPELINE_ID \
  --build-arg LUMIN_GRAPHQL_API \
  --build-arg LUMIN_NODE_ENV \
  --build-arg LUMIN_ESLINT_NO_DEV_ERRORS=true \
  --build-arg LUMIN_GOOGLE_CLIENT_ID \
  --build-arg LUMIN_FACEBOOK_CLIENT_ID \
  --build-arg LUMIN_WS_URL \
  --build-arg LUMIN_JIRA_API_ID \
  --build-arg LUMIN_REDIRECT_URI \
  -t $REGISTRY_HOSTNAME/$REGISTRY_IMAGE_NAME:$TAG \
  -f Dockerfile .