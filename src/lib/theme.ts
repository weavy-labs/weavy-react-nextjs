
export const initTheme = () => {
    const storedTheme: string | null = localStorage.getItem('theme')

    const getPreferredTheme = () => {
        if (storedTheme) {
            return storedTheme
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = function (theme: string) {        
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
            document.documentElement.classList.add('wy-dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
            if(theme === "dark"){
                document.documentElement.classList.add("wy-dark");
            } else{
                document.documentElement.classList.remove("wy-dark");
            }
            
        }
    }

    setTheme(getPreferredTheme());

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {        
        //if (storedTheme !== 'light' || storedTheme !== 'dark') {
        setTheme(getPreferredTheme())
        //}
    })
        
    const themeSwitcher = document.querySelector('.theme-switcher');
    
    if (themeSwitcher) {
      themeSwitcher.addEventListener('click', () => {
        const theme = document.documentElement.dataset.bsTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        setTheme(theme);
      });
    }

}


