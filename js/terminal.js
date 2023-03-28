
$(function () {
    const logo = [
        '    _____                      __                   ',
        '   / ___/___  _________ ____  / /   ___  ____  ____ ',
        '   \\__ \\/ _ \\/ ___/ __ `/ _ \\/ /   / _ \\/ __ \\/ __ \\',
        '  ___/ /  __/ /  / /_/ /  __/ /___/  __/ /_/ / / / /',
        ' /____/\\___/_/   \\__, /\\___/_____/\\___/\\____/_/ /_/ ',
        '                /____/                              ',
        '                                    Python Developer'
    ]

    const skills = [
        
        'Python',
        'Django',
        'Flask',
        'SQL',
        'PostgreSQL'
    ]

    let animation;
    const delay = time => new Promise(r => setTimeout(r, time));

    const animate = async () => {
        animation = true;
        // prompt animation will ensure that cursor is in same line as entered text
        term.clear().set_prompt('');
        for (let line of logo) {
            await term.typing('enter', 0, line)
            await delay(50)
        }
        await delay(500)

        await term.typing('enter', 0, 'Technical Skills:')
        await delay(500)
        for (let skill of skills) {
            await term.typing('enter', 0, ` - ${skill}`)
            await delay(50)
        }

        // await delay(500);
        // await term.set_prompt('Wake up, Neo...', { typing: true });

        term.set_prompt('');
        animation = false;
    };

    const unasync = function (fn) {
        return () => {
            fn();
        };
    };

    const term = $('.terminal').terminal(unasync(animate), {
        prompt: '',
        greetings: false,
        keydown: () => animation ? false : undefined
    });

    animate();
});

