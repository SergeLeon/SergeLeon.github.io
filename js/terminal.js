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
            'PostgreSQL',
            'Selenium',
        ],
        'Links': [
            '[[!;;;;https://github.com/SergeLeon]Github]',
            '[[!;;;;https://t.me/SergeLeon]Telegram]',
        ]
    }
    const itemsLength = Object.keys(items).length

    // let animation;
    const delay = time => new Promise(r => setTimeout(r, time));

    async function animate() {
        // animation = true;
        term.clear().set_prompt('');
        for (let line of logo) {
            await term.echo(line)
            await delay(100)
        }
        let itemNumber = 0
        for (let item in items) {
            itemNumber++
            console.log(term.cols())

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

    async function resizeFont() {
        let fontSize = parseFloat($('.trinity-dialog').css("--size"))
        const cols = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) ? 55 : 70

        console.log(cols, term.cols())

        while (cols < term.cols()) {
            fontSize += 0.1
            console.log(fontSize, term.cols())
            $('.trinity-dialog').css("--size", `${fontSize}`)
            term.resize()
            await delay()
            if (fontSize > 3) break
        }
        while (cols > term.cols()) {
            fontSize -= 0.1
            $('.trinity-dialog').css("--size", `${fontSize}`)
            term.resize()
            await delay()
            console.log(fontSize, term.cols())
            if (fontSize < 1) break
        }

    }

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

    async function start() {
        await resizeFont()
        animate();
    }

    start()
});

