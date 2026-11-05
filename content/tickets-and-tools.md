---
title: tickets & tools
description: a one-click ticket panel routes support requests, reaction roles let members opt in with an emoji, giveaways can be gated to certain roles or levels, and invite tracking shows who invited who.
order: 4
icon: fa-ticket-alt
card: support ticket panels, modmail, applications, reaction roles, giveaways, and invite tracking.
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

## applications {#applications}

take applications for staff, event hosts, or anything else with a form members fill in on taz.bot. you build the form on the dashboard's applications page; members start it with `/apply` in your server.

::: commands
- `/apply form:` - get your link to an open form. `form` is only needed when more than one is open.
:::

`/apply` answers with a private link that works once and expires after 2 hours. it's tied to the member who ran it, so a link someone shares can't be used to apply as them. the form shows who they're applying as, and once they send it, it's posted in your responses channel with **accept** and **deny** buttons.

- **questions:** short answer, paragraph, one choice, several choices, or a number (with an optional range). each one can be required or optional. up to 25 per form.
- **how many forms:** 3 per server, unlimited with [taz Plus](/plus). a form that's switched off isn't offered by `/apply`.
- **responses channel:** every form needs one before anyone can apply. the dashboard can make a staff-only `#applications` channel for you.
- **who reviews:** anyone with Manage Server, the form's reviewer roles, or a taz staff grant for "review applications". staff can also accept and deny from the dashboard's responses tab, where the full answers are kept.
- **accepting:** gives the form's accept roles, if it has any. taz's own role has to be above them.
- **telling the applicant:** taz DMs them the result. turn on "tell denied applicants why" and deny asks for a reason to send them. without it, a reason you write on the dashboard is only seen by staff.
- **who can apply:** a minimum Discord account age, a minimum time in your server, no warns (active ones, or any on record), no past bans, and a wait between tries. someone with an application still waiting can't send another to the same form.
- **how long answers are kept:** 90 days after accept or deny, or 90 days after they were sent if nobody decides. deleting a form deletes its responses too.

the applications page needs the same dashboard access as tickets: view to read responses, edit to build forms and decide.

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
free servers get 5 active ticket panels, 10 active giveaways at once and 3 application forms - taz plus removes the ceiling entirely. none of these limits apply retroactively to what you've already created.
:::
