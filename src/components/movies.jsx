import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import lodash from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  //gets called when an instance of this component is rendered in the dDOM
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    //initialize movies and genres array as empty arrays, while we load data from server
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies]; //spread operator clone arrayy
    const index = movies.indexOf(movie); //find index
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
    //console.log("page", page);
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
    console.log("genre ", genre);
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = lodash.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;
    if (moviesCount === 0) return <p>No Movies in the database</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <React.Fragment>
        <div className="container">
          <p>{totalCount} movies found in the database</p>

          <div className="row">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />

            <div className="col-md-8 m2">
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />

              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
