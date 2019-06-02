Tools

The package.json for this project points to tools/*.js files.
Any changes in the tools directory should be followed by:

npx tsc --skipLibCheck tools/*.ts

Prior to a commit.

