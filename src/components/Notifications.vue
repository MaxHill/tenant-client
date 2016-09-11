<template>
   <ul class="Notification">
    <li
        class="Notification__item Notification__item--{{ notification.type }}"
        v-for="notification in notifications"
        v-if="!notification.closed"
        transition="Notification"
        @click="close(notification)"
        >
            <span class="Notification__title">{{ notification.title }}</span>
            <span class="Notification__details">{{ notification.details }}</span>
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
            addNotification(type, title, details = '') {
                let notification = {title, type, details, closed: false};
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
                if (!('title' in data)) {
                    Object.keys(data).forEach(key => {
                        let error = data[key];
                        this.addNotification('error', error.title, error.details);
                    });
                    return true;
                }
                this.addNotification('error', data.title, data.details);
            });

            Bus.$on('Notification_success', data => {
                this.addNotification('success', 'Success', data);
            });

            Bus.$on('Notification', data => {
                this.addNotification('notice', 'Notice', data);
            });
        }
    };
</script>
