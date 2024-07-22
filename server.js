const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 8080

const app = express()
// app.use(express.static(__dirname))

// Налаштування для обслуговування статичного контенту з папки 'build'
app.use(express.static(path.resolve(__dirname, 'build')));

// app.use(express.static(path.resolve(__dirname, 'build')))

// Налаштування для обслуговування статичного контенту з поточної директорії (__dirname)
app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT , () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})