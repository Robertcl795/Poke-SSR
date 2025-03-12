module.exports = {
  onPreBuild: ({ utils }) => {
    console.log('Current directory:', process.cwd());
    utils.run.command('find . -type d -name "server" | xargs ls -la');
    utils.run.command('find . -name "server.js" | xargs ls -la');
  },
  onBuild: ({ utils }) => {
    console.log('Build completed, checking dist directory structure:');
    utils.run.command('find ./dist -type f | sort');
  },
};
