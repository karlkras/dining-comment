export const tableBody = `
    <thead>
      <tr>
        <th scope="col" class="left">Dining Category</th>
        <th scope="col" class="left">Rating (1=poor, 5=excellent)</th>
        <th scope="col">Comments</th>
      </tr>
    </thead>
    <tbody>
      {TABLE-ROWS}
    </tbody>
  `
export const ratingBody = `
    <tr>
      <td>
        <input type="text" class="title" value="{HEADER-NAME}" readonly/>
      </td>
      <td>
        <div id="{ID}" class="ratings">
          <span class="star">&#9734;</span>
          <span class="star">&#9734;</span>
          <span class="star">&#9734;</span>
          <span class="star">&#9734;</span>
          <span class="star">&#9734;</span>
          <span class="rate-count"><input type="number" min="0" max="5" step=="1" value="0"/></span>
        </div>
      </td>
      <td>
        <textarea id="{COMMENT-ID}-comments" rows="5" cols="30" class="comments">

        </textarea>
      </td>
    </tr>
`
export const headerContent = `
      <h2>Hillside</h2>
      <h4>Dining comment card</h4>
      <div class="line"></div>
`
