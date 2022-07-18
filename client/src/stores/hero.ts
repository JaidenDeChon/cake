import { defineStore } from 'pinia';

import { changeHero, fetchHero } from '@/api/heroApi';
import type { IHero } from '@models/';

export const useHeroStore = defineStore({

    id: 'hero',

    state: () => ({
        primaryText: undefined as string | undefined,
        secondaryText: undefined as string | undefined,
        primaryCallToAction: undefined as string | undefined,
        secondaryCallToAction: undefined as string | undefined,
        justify: undefined as string | undefined,
        img: undefined as string | undefined
    } as IHero),

    actions: {

        async fetchHero(): Promise<IHero> {
            const hero = await fetchHero();
            this.$patch({ ...hero });
            return hero;
        },

        async changeHero (newData: IHero): Promise<void> {
            await changeHero(newData);
            await fetchHero();
        }
    }
});
