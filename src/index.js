const alfy = require('alfy');

const DOMAIN = alfy.config.get('DOMAIN');
const TOKEN = alfy.config.get('TOKEN');

const input = alfy.input.trim();

const apiRequest = path => alfy.fetch(`${DOMAIN}/api/v4${path}`, {
	headers: {
		Authorization: `Bearer ${TOKEN}`
	},
	json: true
})

if (DOMAIN && TOKEN) {
	apiRequest('/teams')
		.then(teams => {
			Promise.all(teams.map(team => (
				Promise.all([
					// Search channels
					apiRequest(`/teams/${team.id}/channels/autocomplete?name=${input}`)
						.then(channels => channels.map(channel => ({
							title: channel.display_name,
							subtitle: channel.purpose || channel.header,
							arg: `${DOMAIN}/${team.name}/channels/${channel.name}`
						}))),
					// Search users
					apiRequest(`/users/autocomplete?team_id=${team.id}&name=${input}`)
						.then(({ users }) => users.map(user => ({
							title: `${user.first_name} ${user.last_name}`,
							subtitle: `${user.email}${user.position && ` | ${user.position}`}`,
							arg: `${DOMAIN}/${team.name}/messages/@${user.username}`
						})))
				])
					.then(results => {
						return results.reduce((prev, next) => ([
							...prev,
							...next
						]), []);
					})
			)))
				.then(results => {
					alfy.output(results.reduce((prev, next) => ([
						...prev,
						...next
					]), []));
				});
		});
} else {
	const errors = [];

    if (!DOMAIN) {
        errors.push({
            title: 'Domain required',
            subtitle: 'You must run mm_domain to set your chat server domain'
        });
    }

    if (!TOKEN) {
        errors.push({
            title: 'Personal Access Token required',
            subtitle: 'You must run mm_token to set your personal access token'
        });
    }

    alfy.output(errors);
}

