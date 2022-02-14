<template>
    <div class="contact-us">
        <form class="contact-us__form" @submit="postNewMessage">

            <!-- Name Input -->
            <div class="contact-us__label-input-combo">
                <label for="contact-us__input--name">Name</label>
                <input v-model="newMessage.name" type="text" id="contact-us__input--name" required>
            </div>

            <!-- Email input -->
            <div class="contact-us__label-input-combo">
                <label for="contact-us__input--email">Email</label>
                <input v-model="newMessage.email" type="email" id="contact-us__input--email" required>
            </div>

            <!-- Phone Number Input -->
            <div class="contact-us__label-input-combo">

                <!-- Phone number field -->
                <label for="contact-us__input--phone">Phone Number</label>
                <input v-model="newMessage.phone" type="tel" id="contact-us__input--phone" required>

                <div class="contact-us__inline-inputs">

                    <!-- Checkbox: OK to text me -->
                    <div class="contact-us__label-input-combo contact-us__label-input-combo--reverse-order">
                        <label for="contact-us__input--ok-to-text">It's OK to text me.</label>
                        <input v-model="newMessage.okToText" type="checkbox" id="contact-us__input--ok-to-text">
                    </div>

                    <!-- Checkbox: OK to call me  -->
                    <div class="contact-us__label-input-combo contact-us__label-input-combo--reverse-order">
                        <label for="contact-us__input--ok-to-call">It's OK to call me.</label>
                        <input v-model="newMessage.okToCall" type="checkbox" id="contact-us__input--ok-to-call">
                    </div>

                </div>

            </div>

            <!-- Message Input -->
            <div class="contact-us__label-input-combo">
                <label for="contact-us__input--message">What are you looking for?</label>
                <textarea v-model="newMessage.message" name="message" id="contact-us__input--message" rows="6"  required/>
            </div>

            <!-- Submit button -->
            <input type="submit">
        </form>
    </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component';

const API_URL = 'http://localhost:4000/messages';

@Options({
    data() {
        return {
            error: '',
            newMessage: {
                name: '',
                email: '',
                phone: '',
                message: '',
                okToText: false,
                okToCall: false,
            },
        };
    },
    watch: {
        error (newValue): void {
            console.log(newValue);
        }
    }
})
export default class ContactUs extends Vue {
    // Any error will be set to this variable.
    error!: string;

    // For storing the posted API data.
    newMessage!: Record<string, unknown>;

    public postNewMessage(): void {
        const postObject = {
            method: 'POST',
            body: JSON.stringify(this.newMessage),
            headers: {
                'content-type': 'application/json'
            }
        };

        fetch(API_URL, postObject)
            .then(function (response) {
                response.json()
            })
            .then(function (this: any, result: any) {
            // log error if there was one, otherwise clear
                result.details
                    ? this.error = result.details.map(function (detail: any) { return detail.message })
                    : this.error = '';
            });
    }


}

</script>

<style lang="scss" scoped>

    .contact-us {
        --width--normal: calc(100% - 3rem);
        --width--max: 40rem;
    }

    .contact-us__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        * {
            font-family: 'Poppins', sans-serif;
        }
    }

    .contact-us__label-input-combo,
    input[type=submit] {
        max-width: var(--width--max);
        width: var(--width--normal);

        display: flex;
        flex-direction: column;

        margin-top: 1.5rem;
    }

    .contact-us__inline-inputs {

        display: flex;

        .contact-us__label-input-combo {
            flex-direction: row;
            align-items: center;

            margin-top: 0.5rem;

            &--reverse-order {
                flex-direction: row-reverse;
            }

            & > * {
                margin-right: 0.4rem;
            }
        }
    }

    input[type=submit] {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0.5rem;

        color: white;

        cursor: pointer;
        background-color: salmon;
        border: none;
        transition: background-color 0.1s;

        &:hover,
        &:focus {
            background-color: darksalmon;
        }
    }

    input[type=text],
    input[type=email],
    input[type=tel],
    textarea {
        padding: 0.5rem;
        border: 2px solid salmon;
    }

    input[type=text],
    input[type=email],
    input[type=tel],
    input[type=submit],
    textarea {

        border-radius: 0.2rem;
        transition: background-color 0.1s;

        &:focus {
            outline: none;
            border-color: darksalmon;
        }
    }

    input[type=checkbox] {
        width: 1.2rem;
        height: 1.2rem;
    }

    textarea {
        resize: none;
    }

    @media screen and (min-width: 400px) {

        .contact-us__inline-inputs {

            display: flex;

            .contact-us__label-input-combo {
                flex-direction: row;
                align-items: center;
                justify-content: center;

                margin-top: 0.5rem;

                &--reverse-order {
                    flex-direction: row-reverse;
                }

                & > * {
                    margin-right: 0.8rem;
                }
            }
        }
    }

</style>
