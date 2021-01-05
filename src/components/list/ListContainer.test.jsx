import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import ListContainer from "./ListContainer";
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer()
  
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("should call apiClient and pass results to List", async () => {
    server.use(
        rest.get('http://localhost:3001/peliculas', (req, res, ctx) => {
            return res(ctx.json([{title: "Tenet", id: "0", ranking: "19", type: "Action", director: "Nolan"}]))
        }))

    render(<ListContainer />)

    expect(await screen.findByText("Tenet")).toBeInTheDocument();
})

test("should call apiClient on update and refresh list", async () => {
    let tenetHasBeenUpdated = false
    server.use(
        rest.put('http://localhost:3001/peliculas/0', (req, res, ctx) => {
            if (req.body.title == "TenetCHANGED") {
                tenetHasBeenUpdated = true;
                return res(ctx.status(200));
            }
        }),
        rest.get('http://localhost:3001/peliculas', (req, res, ctx) => {
            return tenetHasBeenUpdated
                ? res(ctx.json([{title: "TenetCHANGED", image: "img/tenet.jpg", id: "0", ranking: "8", type: "action", director: "Nolan"}]))
                : res(ctx.json([{title: "Tenet",image: "img/amelie.jpg", id: "0", ranking: "8", type: "romantic", director: "Tiersenn"}]))
        })
    )
    render(<ListContainer />)

    await updateMovieTitle('Tenet', 'TenetCHANGED')

    expect(await screen.findByText("TenetCHANGED")).toBeInTheDocument();
})

test("should display an error if there is an error when updating", async () => {
    server.use(
        rest.put('http://localhost:3001/peliculas/0', (req, res, ctx) => {
            return res(ctx.status(500));
        }),
        rest.get('http://localhost:3001/peliculas', (req, res, ctx) => {
            return res(ctx.json([{title: "Amelie", image:"img/amelie.jpg", id: "0", ranking: "8", type: "romantic", director: "Tiersenn"}]))
        })
    )

    render(<ListContainer />)

    await updateMovieTitle('Amelie', 'AmelieCHANGED')

    expect(await screen.findByText("Error updating movie")).toBeInTheDocument();
})

test("should delete a movie and refresh list", async () => {
    let tenetHasBeenDeleted = false;
    server.use(
        rest.delete('http://localhost:3001/peliculas/0', (req, res, ctx) => {
            tenetHasBeenDeleted = true;
            return res(ctx.status(200));            
        }),
        rest.get('http://localhost:3001/peliculas', (req, res, ctx) => {
            return tenetHasBeenDeleted
                ? res(ctx.json([]))
                : res(ctx.json([{title: "Tenet", id: "0", ranking: "19", type: "Action", director: "Nolan"}]))
        })
    )
    render(<ListContainer />)

    fireEvent.click(await screen.findByText("Delete"))
    await waitForElementToBeRemoved(await screen.findByText("Tenet"));
})


test("should create a movie and refresh list", async () => {
    let tenetHasBeenCreated = false;
    server.use(
        rest.post('http://localhost:3001/peliculas', (req, res, ctx) => {
            if (req.body.title == "Amelie" ) {
                tenetHasBeenCreated = true;
                return res(ctx.status(200));            
            }
        }),
        rest.get('http://localhost:3001/peliculas', (req, res, ctx) => {
            return tenetHasBeenCreated
                ? res(ctx.json([{title: "Amelie", image: "img/amelie.jpg", id: "0", ranking: "8", type: "romantic", director: "TIersenn"}]))
                : res(ctx.json([]))
        })
    )
    render(<ListContainer />)

    await createMovieWithTitle('Amelie')

    expect(await screen.findByText("Amelie")).toBeInTheDocument();
});

async function updateMovieTitle(movieToUpdate, movieChanged) {
    fireEvent.click(await screen.findByText("Edit"))
    const input = screen.getByPlaceholderText(movieToUpdate);
    fireEvent.change(input, { target: { value: movieChanged  } })
    const image = screen.getByPlaceholderText('img/amelie.jpg');
    fireEvent.change(image, { target: {value: 'img/tenet.jpg' }})
    const ranking =  screen.getByPlaceholderText('8');
    fireEvent.change(ranking, { target: { value: '8' } })
    const type = screen.getByPlaceholderText('romantic')
    fireEvent.change(type, { target: { value: 'action'}})
    const director = screen.getByPlaceholderText('Tiersenn')
    fireEvent.change(director, { target: { value: 'Nollan'}})

    fireEvent.click(screen.getByText('Submit'))
}

async function createMovieWithTitle(movieTitle){
    fireEvent.click(screen.getByText("Create Movie")); 
    const input = screen.getByPlaceholderText('title');
    fireEvent.change(input, { target: { value: movieTitle } });
    const image = screen.getByPlaceholderText('image');
    fireEvent.change(image, { target: {value: 'img/amelie.jpg' }})
    const ranking =  screen.getByPlaceholderText('ranking');
    fireEvent.change(ranking, { target: { value: '8' } })
    const type = screen.getByPlaceholderText('type')
    fireEvent.change(type, { target: { value: 'romantic'}})
    const director = screen.getByPlaceholderText('director')
    fireEvent.change(director, { target: { value: 'Tiersenn'}})
    fireEvent.click(screen.getByText('Submit'));
}