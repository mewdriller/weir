const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const IssueCountQuery = `
  query IssueCountQuery($projectId: ID!) {
    issues: issuesConnection(where: { project: { id: $projectId } }) {
      aggregate {
        count
      }
    }
    project(where: { id: $projectId }) {
      handle
    }
  }
`;

const resolvers = {
  Mutation: {
    createIssue(
      parent,
      { body, estimate, priority, projectId, title, type },
      ctx,
      info,
    ) {
      return ctx.db
        .request(IssueCountQuery, { projectId })
        .then(({ data: { issues, project } }) => {
          const handle = `${project.handle}-${issues.aggregate.count + 1}`;

          return ctx.db.mutation.createIssue(
            {
              data: {
                body,
                estimate,
                handle,
                priority,
                project: { connect: { id: projectId } },
                title,
                type,
              },
            },
            info,
          );
        });
    },

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
    issues(parent, args, ctx, info) {
      return ctx.db.query.issues(null, info);
    },

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
