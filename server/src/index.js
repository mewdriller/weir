const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = {
  Mutation: {
    createProject(parent, { handle, name, organizationId }, ctx, info) {
      return ctx.db.mutation.createProject(
        {
          data: {
            handle,
            name,
            organization: { connect: { id: organizationId } },
          },
        },
        info,
      );
    },
  },

  Query: {
    organizations(parent, args, ctx, info) {
      return ctx.db.query.organizations(null, info);
    },

    project(parent, { handle }, ctx, info) {
      return ctx.db.query.project({ where: { handle } }, info);
    },

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
