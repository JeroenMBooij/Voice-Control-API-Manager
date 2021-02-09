export default {
    port: parseInt(process.env.PORT || '3010', 10),
    GITLAB_TOKEN: process.env.GITLAB_TOKEN || ''
  };