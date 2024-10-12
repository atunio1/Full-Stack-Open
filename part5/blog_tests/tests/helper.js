const createUser = async (request, name, username, password) => {
  await request.post('/api/users', {
    data: {
      name: name,
      username: username,
      password: password
    }, 
  })
}

const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'create blog' }).click()
  await page.getByTestId('title').fill(blog.title)
  await page.getByTestId('author').fill(blog.author)
  await page.getByTestId('url').fill(blog.url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.locator('.blog').getByText(blog.title).waitFor()
}

const deleteBlog = async (page) => {
   // event listener for dialog
   page.on('dialog', async dialog => await dialog.accept())
   await page.getByRole('button', { name: 'view' }).click()
   await page.getByRole('button', { name: 'delete' }).click()
   await page.evaluate(() => alert('Confirm if you want to delete this blog'))
}

const addLikes = async (page, title, numLikes) => {
  const blog = await page.getByText(title)
  await blog.getByRole('button', { name: 'view' }).click()
  for (let i = 0; i < numLikes; i++) {
    await blog.getByRole('button', { name: 'like' }).click()
    await page.waitForTimeout(500)
  }
}

export { loginWith, createBlog, createUser, deleteBlog, addLikes }