<template>
   <ul class="Notification">
    <li
        class="Notification__item Notification__item--{{ notification.type }}"
        v-for="notification in notifications"
        v-if="!notification.closed"
        transition="Notification"
        @click="close(notification)"
        >
            {{ notification.message }}
            <div class="Notification__close">
                <svg class="Notification__close-icon">
                    <use xlink:href='#close'>
                </svg>
            </div>
        </li>
    </ul>
</template>

<script>
    /**
     * The Notifications component.
     * @type {Object}
     */
    import Bus from '../Bus';

    export default {
        data() {
            return {
                notifications: []
            };
        },
        methods: {
            close(notification) {
                notification.closed = true;
            },
            addNotification(type, message) {
                let notification = {message, type, closed: false};
                this.notifications.unshift(notification);
                if (notification.type === 'error') {
                    return;
                }
                this.timeoutNotification(notification);
            },
            timeoutNotification(notification) {
                setTimeout(() => {
                    notification.closed = true;
                }, 3000);
            }
        },
        ready() {
            Bus.$on('Notification_error', data => {
                this.addNotification('error', data.message);
            });

            Bus.$on('Notification_success', data => {
                this.addNotification('success', data);
            });

            Bus.$on('Notification', data => {
                this.addNotification('notice', data);
            });
        }
    };
</script>
