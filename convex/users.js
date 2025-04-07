// convex/users.js
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const saveUser = mutation({
  args: {
    userName: v.string(),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUsers = await ctx.db
      .query('users')
      .filter(q => q.eq(q.field('userEmail'), args.userEmail))
      .collect();

    if (existingUsers.length === 0) {
      await ctx.db.insert('users', {
        userName: args.userName,
        userEmail: args.userEmail,
      });
    }
  },
});

// convex/users.js
export const getUserByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
      return await ctx.db
        .query("users")
        .filter(q => q.eq(q.field("userEmail"), args.email))
        .first();
    }
  });