$(function () {
    const logo = [
        '    _____                      __                   ',
        '   / ___/___  _________ ____  / /   ___  ____  ____ ',
        '   \\__ \\/ _ \\/ ___/ __ `/ _ \\/ /   / _ \\/ __ \\/ __ \\',
        '  ___/ /  __/ /  / /_/ /  __/ /___/  __/ /_/ / / / /',
        ' /____/\\___/_/   \\__, /\\___/_____/\\___/\\____/_/ /_/ ',
        '                /____/                              ',
    ]

    const items = {
        'Info': [
            "[[;#55eaa7f2;]Name]: Sergey Kravchenko"
        ],
        'Technical Skills': [
            'Python',
            'Django',
            'Flask',
            'SQL',
            'PostgreSQL'
        ],
        'Links': [
            '[[!;;;;https://github.com/SergeLeon]Github]',
            '[[!;;;;https://t.me/SergeLeon]Telegram]',
        ]
    }
    const itemsLength = Object.keys(items).length

    // let animation;
    const delay = time => new Promise(r => setTimeout(r, time));

    const animate = async () => {
        // animation = true;
        term.clear().set_prompt('');
        for (let line of logo) {
            await term.echo(line)
            await delay(100)
        }
        let itemNumber = 0
        for (let item in items) {
            itemNumber++

            await delay(500)
            await term.typing('enter', 0, `${item}:`)

            await delay(500)
            for (let point of items[item]) {
                    await term.echo(` - [[;#B9EDFF;]${point}]`)

                await delay(50)
            }

            if (itemNumber != itemsLength) await term.echo('')
        }

        // await delay(500);
        // await term.set_prompt('Wake up, Neo...', { typing: true });

        term.set_prompt('');
        // animation = false;
    };

    const unasync = function (fn) {
        return () => {
            fn();
        };
    };

    const term = $('.terminal').terminal(unasync(animate), {
        prompt: '',
        greetings: false,
        // keydown: () => animation ? false : undefined
        keydown: () => false

    });

    animate();
});

