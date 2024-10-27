/**
 * All plugins exported here are internal plugins.
 * When building on your own you can configure them here.
 * For default build, these will all be FORCED turned on and cant be turned off.
 */
export default [{
    name: "Owner Badges", 
    description: "Adds a little cool badge to the owner of this plugin :P",
    async execute() {
        // what Actually code should look like
        /**
         * CreateAdditonalUserBadge(':crown:', 'Owner', 'This plugin is owned by the owner of this plugin :P', (e) => e.user.displayName ==  )
             */
            console.log('Owner Badges Plugin Loaded')
    }
}]