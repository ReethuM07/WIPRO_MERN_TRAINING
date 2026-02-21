// app.js
const App = (function () {
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
    const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

    const postsContainer = document.getElementById('posts-container');
    const todosContainer = document.getElementById('todos-container');
    const postsError = document.getElementById('posts-error');
    const todosError = document.getElementById('todos-error');

    // Fetch posts from API
    async function fetchPosts() {
        try {
            const response = await fetch(postsUrl);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            displayPosts(data);
        } catch (error) {
            postsError.textContent = `Failed to load posts. ${error.message}`;
        }
    }

    // Display posts in DOM
    function displayPosts(posts) {
        postsContainer.innerHTML = '';
        posts.slice(0, 10).forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('card');
            postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            postsContainer.appendChild(postDiv);
        });
    }

    // Fetch todos from API
    async function fetchTodos() {
        try {
            const response = await fetch(todosUrl);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            displayTodos(data);
        } catch (error) {
            todosError.textContent = `Failed to load todos. ${error.message}`;
        }
    }

    // Display todos in DOM
    function displayTodos(todos) {
        todosContainer.innerHTML = '';
        todos.slice(0, 10).forEach(todo => {
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('card');
            todoDiv.innerHTML = `<strong>${todo.title}</strong> - ${todo.completed ? '✅ Completed' : '❌ Pending'}`;
            todosContainer.appendChild(todoDiv);
        });
    }

    // Initialize the app
    function init() {
        fetchPosts();
        fetchTodos();
    }

    return {
        init
    };
})();

// Start the app
document.addEventListener('DOMContentLoaded', App.init);
