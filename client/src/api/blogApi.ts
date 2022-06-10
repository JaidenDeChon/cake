import type BlogPost from '../../../models/BlogPost';

export async function fetchBlogPosts(): Promise<BlogPost[]> {
    return Promise.resolve([{
        title: 'Lorem Ipsum Dolor Sit Amet',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis purus vitae ' +
            'velit tempus scelerisque. Vestibulum quis lorem et eros lacinia dignissim. Praesent malesuada ' +
            'nisi nec risus dignissim rhoncus. Nunc eu mattis massa. Maecenas efficitur nisl vel nisi ' +
            'bibendum, at semper dui venenatis. Mauris et sollicitudin nisl. Vivamus pulvinar porttitor ' +
            'dui vitae congue. Nulla facilisi. Cras fermentum, justo vel rutrum rhoncus, ipsum elit ' +
            'pellentesque erat, sed fringilla elit lectus vitae tellus. Ut gravida nec quam eu hendrerit. ' +
            'Nullam rutrum finibus tortor sit amet blandit. Cras porttitor sit amet arcu vitae feugiat. ' +
            'Sed ullamcorper scelerisque diam, venenatis hendrerit est varius at. Morbi aliquet sit amet ' +
            'felis sed aliquam. Nullam quis auctor velit, in cursus arcu. Morbi vitae euismod arcu. Etiam ' +
            'congue pretium purus a vestibulum. Duis finibus interdum sem, nec suscipit tortor facilisis ' +
            'nec. Nam in efficitur nulla. Vestibulum tincidunt tellus ut ligula venenatis, sed fringilla ' +
            'dolor accumsan. Nunc vehicula fringilla purus, eu viverra ipsum sagittis non. Donec vehicula ' +
            'blandit malesuada. Vivamus ac libero leo. Nullam congue vulputate magna, vitae sagittis justo ' +
            'elementum at. Duis pulvinar arcu in massa hendrerit, in tristique felis lacinia. Maecenas ' +
            'ullamcorper magna eu quam pulvinar consectetur. Donec enim urna, dignissim in tempus quis, ' +
            'congue id tellus. Quisque accumsan tincidunt erat ac blandit. Cras dapibus iaculis leo, id ' +
            'volutpat sapien sollicitudin ac. Nulla lacus ante, venenatis eu lorem eu, tincidunt aliquet ' +
            'nisi. Nunc tempus neque quis nibh venenatis, at commodo dolor sollicitudin.',
        date: 'June 9, 2022',
        img: 'https://images.unsplash.com/photo-1654704089641-abee50d23b7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    }]);
}
