const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = {
  Mutation: {
    createProject(parent, { key, name }, ctx, info) {
      return ctx.db.mutation.createProject({ data: { key, name } }, info);
    },
  },
  Query: {
    projects(parent, args, ctx, info) {
      return ctx.db.query.projects(null, info);
    },
  },
};

const server = new GraphQLServer({
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: 'https://us1.prisma.sh/public-fluffjaguar-915/weir/dev',
      typeDefs: 'src/generated/prisma.graphql',
    }),
    debug: true,
  }),
  resolvers,
  typeDefs: './src/schema.graphql',
});

server.start(() => console.log('Server is running on http://localhost:4000'));
