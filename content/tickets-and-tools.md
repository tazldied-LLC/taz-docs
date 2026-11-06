---
title: tickets & tools
description: a one-click ticket panel routes support requests, reaction roles let members opt in with an emoji, giveaways can be gated to certain roles or levels, and invite tracking shows who invited who.
order: 4
icon: fa-ticket-alt
card: support ticket panels, modmail, forms and ban appeals, reaction roles, giveaways, and invite tracking.
---

a one-click ticket panel routes support requests, reaction roles let members opt in with an emoji, giveaways can be gated to certain roles, levels, or prestige tiers, and invite tracking shows who invited who.

## tickets {#tickets}

`/ticket menu` is the fastest way in - builds and edits panels, buttons, and bans interactively. its front page has the open/archive ticket category pickers, each with a "create a category for this" button - previously these two categories were only settable via `/mod settings ticketcategory`/`ticketarchivecategory`, which still works too. the dashboard's tickets page has the same two category pickers and create-category buttons. the pieces it wraps:

::: commands
- `/ticket panel create` - start a new panel.
- `/ticket panel addbutton | set-button* | togglebutton | removebutton` - each button on a panel opens its own ticket category, with its own embed, cooldown, and optional intake question.
- `/ticket panel send` - posts the panel to a channel.
- `/ticket panel edit | set-mode | delete | list` - manage existing panels.
- `/ticket ban add | remove | list` - block a specific member from opening tickets. adding and removing a ticket ban is logged to your mod log with who did it (the **Ticket Bans** logging toggle).
- `/transcripts mine | user | all` - pull a closed ticket's transcript back up - your own, a specific member's (staff only), or a list of everyone who has one (staff only). see [utilities](/docs/utilities#transcripts).
- `/purge-archives` - deletes the closed tickets in your archive category, after listing them and asking. open tickets and any other channel in the category are left alone, and transcripts are kept. admins only.
:::

support roles are optional. a ticket is always visible to whoever opened it and to your admins; add support roles with `/mod settings addsupportrole` (or per button) so your staff can see them too and get pinged when one opens. admins count as support either way, so they can claim and close tickets.

the dashboard's tickets page covers the same ground with a proper builder UI, if you'd rather not do it all from Discord.

## modmail {#modmail}

members DM taz, and she opens a private channel for your staff to answer in - so nobody on your team has to DM a member from their own account, and every conversation is kept. it's a natural place for appeals too: "if you think this was a mistake, DM taz."

when someone DMs taz, she asks which server it's for (only servers they're in that have modmail on), then opens a channel in your modmail category that only your support roles and admins can see. the member never sees the channel: everything they send in DMs shows up in it under their own name and avatar, and staff answer by typing in it. each reply reaches the member as a plain DM from taz, starting with the staff member's name.

start a message with `!` to keep it between staff - it isn't sent, and it's left out of the transcript.

::: commands
- `/modmail reply message: attachment: anonymous:` - answer the member with a command instead of typing. `anonymous` hides your name for that one reply.
- `/modmail close reason:` - ends the conversation, tells the member (with your reason, if you give one) and saves a transcript. the channel moves to your modmail archive category, or the ticket archive category if you haven't picked one.
- `/modmail open user: message:` - start a conversation with a member yourself.
- `/modmail settings enabled: category: archive_category: add_support_role: remove_support_role: anonymous_replies: greeting: clear_greeting:` - turn it on and set it up. with no options it shows the current setup. needs Manage Server or a tickets 'edit' dashboard grant.
:::

- **who answers:** modmail's own support roles (`add_support_role`, or the dashboard's tickets page), or your [ticket support roles](#tickets) if you haven't picked any, plus anyone with Manage Server or a tickets 'edit' grant. support roles get pinged when a conversation opens.
- **showing members as themselves:** taz needs the Manage Webhooks permission for this. without it, member messages show up as embeds instead.
- **where:** your modmail category, or the ticket category if you don't pick one.
- **one at a time:** a member has at most one open conversation per server. messaging taz again adds to it. if they have conversations open with more than one server, taz asks which one each message is for.
- **DM settings:** `/modmail open` won't reach someone who turned off DMs from taz with `/me dms`. replies in a conversation they started still go through, since they asked.
- **blocking someone:** a [ticket ban](#tickets) (`/ticket ban add`) stops them opening modmail too.
- **transcripts:** closed conversations are saved like ticket transcripts, so the member can find theirs with `/transcripts mine` and staff with `/transcripts user`.
- **anonymous replies:** off by default, so members know who they're talking to. turn them on with `anonymous_replies` to make every reply show as "staff" instead of your name. the channel always shows which staff member sent what.
- **logging:** opening and closing a conversation is written to your mod log (the **Modmail** logging toggle).
- **slowing down:** taz passes on up to 5 DMs every 10 seconds per person; anything faster gets a ⏳ and isn't sent.

modmail is off until you turn it on, from `/modmail settings` or the dashboard's tickets page.

## forms {#forms}

forms members fill in on taz.bot: staff applications, ban appeals, event sign-ups, feedback, reports, or anything else. you build them on the dashboard's forms page, starting from a template if you like, and members open one with `/form` in your server.

::: commands
- `/form form:` - get your link to an open form. `form` is only needed when more than one is open.
:::

`/form` answers with a private link that works once and expires after 2 hours. it's tied to the member who ran it, so a link someone shares can't be used to answer as them. once they send it, it's posted in your responses channel.

- **questions:** short answer, paragraph, one choice, several choices, or a number (with an optional range). each one can be required or optional. up to 25 per form.
- **how many forms:** 3 per server, unlimited with [taz Plus](/plus). a form that's switched off isn't offered by `/form`.
- **responses channel:** every form needs one before anyone can fill it in. the dashboard can make a staff-only `#form-responses` channel for you.
- **review:** turn it on and each response gets **accept** and **deny** buttons. leave it off to just collect responses.
- **who reviews:** anyone with Manage Server, the form's reviewer roles, or a taz staff grant for "review form responses". staff can also accept and deny from the dashboard's responses tab, where the full answers are kept.
- **deny reasons:** turn on "ask for a deny reason and send it" and deny asks for a reason, which is added to the deny DM (or put `{reason}` where you want it). without it, a reason you write on the dashboard is only seen by staff.
- **who can fill it in:** a minimum Discord account age, a minimum time in your server, no warns (active ones, or any on record), no past bans, one response per person, and a wait between tries. someone with a response still waiting can't send another to the same form.
- **how long responses are kept:** 90 days after accept or deny, or 90 days after they were sent if nobody decides (or the form has no review). deleting a form deletes its responses too.

### what happens {#form-actions}

each form can do up to 5 things at each step: when someone sends it, and when staff accept or deny it.

- **give or take a role.** taz won't hand out a role with staff permissions (Administrator, Manage Server, Manage Roles, Manage Channels, Manage Webhooks, Ban or Kick Members), or one above her own.
- **DM them.** new forms DM the result of a review by default. DMs say which form and server they came from, and `/me dms` blocks them like any other.
- **post in a channel.** mentions you type in the message ping; anything from their answers doesn't.
- **open a private thread with them** in a channel you pick, with whoever accepted or denied it. pick a channel they can see. taz needs Create Private Threads there.
- **unban them from a linked server** (accept only). see [ban appeals](#ban-appeals).

messages can use `{user}`, `{username}`, `{server}`, `{form}`, `{reason}` (on deny), and each question's own placeholder, like `{q1}`, which the dashboard shows next to the question.

### ban appeals {#ban-appeals}

if people appeal bans in a separate server, link the two and accepting an appeal there unbans them from your main server.

1. the main server's owner makes a link code under **ban appeals** on the forms page. it works once and lasts 15 minutes.
2. the appeal server's owner enters it on the same page there. only owners can link or unlink, and either one can unlink at any time.
3. make a form in the appeal server (the **ban appeal** template is a good start) with **unban them from a linked server** under "when staff accept it". tick the box and taz also DMs them a one-use invite back, good for 7 days.

an appeal form only opens for people who are actually banned in the linked server, and each response shows the ban's reason (and when it happened, if taz has a case for it). anyone who can review that form in the appeal server can unban people from the main one, so pick reviewers you trust. the unban is logged in the main server's mod log as a "ban appeal" case with who accepted it and where. taz needs Ban Members in the main server.

the forms page needs the same dashboard access as tickets: view to read responses, edit to build forms and decide.

## reaction roles {#reaction-roles}

::: commands
- `/reactionroles` - creates a new panel - posts the message and adds the reactions itself.
:::

editing an existing panel's title, description, or role pairs is dashboard-only, under the general settings page.

## giveaways {#giveaways}

::: commands
- `/giveaway create name: duration: unit: required_level: required_roles: required_prestige: min_account_age_days: winners: exclude_admins:` - requirements are independent and combinable - a giveaway can need a role *and* a level, for example. required\_level's choices include "server booster only". `winners` draws up to 20 at once. administrators can enter like anyone else unless you set `exclude_admins`.
- `/giveaway menu` - interactive panel for creating/ending/rerolling giveaways without remembering the full syntax. its requirement box also takes `noadmins`.
- `/giveaway list | end | reroll` - see running/recent giveaways, end one early, or draw again - every winner, or just one with `reroll winner:` (say they never claimed it). a reroll never hands the prize back to anyone who already won it.
- `/giveaway winmessage` - customize what taz says when she announces the winners, per server, instead of the stock line. with several winners, `{user}` becomes all of them.
:::

entering checks every requirement straight away and tells the member exactly what they're missing, so nobody enters a giveaway they could never win. the winners are drawn fairly from everyone who still qualifies when it ends. the dashboard (fun → giveaways) does all of this too, with a running/ended view, entry counts, and a reroll button on each winner.

## invites {#invites}

off by default - a staff member turns it on with `/invites enable` (dashboard: general → invites) before any of this starts recording. discord never actually says which invite a join used - this is a best-effort match against invite use counts, not a guarantee. joins through OAuth2, server discovery, or the widget can't be attributed to anyone and won't count toward either command below.

::: commands
- `/invites enable` / `/invites disable` - staff only - turn invite tracking on or off. past records are kept when you turn it off.
- `/invites count user:` - how many members someone's invited to this server - defaults to yourself.
- `/invites leaderboard` - top inviters in this server.
- `/invites who member:` - staff only - who invited a specific member, and when they joined.
:::

::: note
free servers get 5 active ticket panels, 10 active giveaways at once and 3 forms - taz plus removes the ceiling entirely. none of these limits apply retroactively to what you've already created.
:::
